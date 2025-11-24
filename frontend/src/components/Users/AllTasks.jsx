import React, { useEffect, useRef, useState } from "react";
import { Filter, Search, Edit, Trash2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";
import { useAuthStore } from "../../store/authStore";
import AddNewTask from "../Components/AddNewTask";
/* -------------------------
  Dummy tasks (same as before)
------------------------- */

/* -------------------------
  Helper: generate particles
------------------------- */
const COLORS = [
  "#FF5C8A",
  "#FFD166",
  "#06D6A0",
  "#4D96FF",
  "#9B5FFF",
  "#FF7A00",
  "#00C2FF",
];

function genParticles(count = 40) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 240; // how far it flies
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - (30 + Math.random() * 80); // slight upward bias
    const size = 6 + Math.round(Math.random() * 10);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const delay = Math.random() * 0.12;
    const rotate = Math.round(Math.random() * 360);
    const tilt = (Math.random() - 0.5) * 80;
    return { id: i, x, y, size, color, delay, rotate, tilt };
  });
}

function genRibbons(count = 8) {
  return Array.from({ length: count }).map((_, i) => {
    const angle = (Math.random() - 0.5) * Math.PI; // direction
    const distance = 160 + Math.random() * 260;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - (40 + Math.random() * 80);
    const width = 6 + Math.random() * 8;
    const length = 80 + Math.random() * 140;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const delay = Math.random() * 0.14;
    const rotate = Math.random() * 360;
    return { id: i, x, y, width, length, color, delay, rotate };
  });
}

/* -------------------------
  Pop sound using WebAudio
------------------------- */
function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    // short noise burst
    const bufferSize = ctx.sampleRate * 0.02;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 1000;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.9, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
    noise.stop(now + 0.18);

    // quick sine for "pop"
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    oscGain.gain.setValueAtTime(0.15, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  } catch (e) {
    // Safari or audio blocked — ignore gracefully
    // console.warn("Audio play failed", e);
  }
}

/* -------------------------
  AllTasks component
------------------------- */
const AllTasks = () => {
  const user = useAuthStore((e) => e.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // celebration state
  const [showBurst, setShowBurst] = useState(false);
  const [particles, setParticles] = useState([]);
  const [ribbons, setRibbons] = useState([]);
  const burstRef = useRef(null);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    if (showBurst) {
      setParticles(genParticles(82));
      setRibbons(genRibbons(25));
      // play sound
      playPopSound();
    } else {
      // cleanup small delay to let exit animations run before clearing
      const t = setTimeout(() => {
        setParticles([]);
        setRibbons([]);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [showBurst]);
  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await api.get("/todo/get-todo");
        console.log(response.data.data);
        setTasks(response.data.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getAllTasks();
  }, [user]);
  const handleToggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);

      // Send updated isCompleted to backend
      const response = await api.patch(`/todo/update-todo/${id}`, {
        isCompleted: !task.isCompleted,
      });

      // Update UI instantly
      setTasks((prev) =>
        prev.map((t) =>
          t._id === id
            ? {
                ...t,
                isCompleted: !t.isCompleted,
              }
            : t
        )
      );

      // Celebration animation (only when marking completed)
      if (!task.isCompleted) {
        setShowBurst(true);
        setTimeout(() => setShowBurst(false), 1200);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/todo/delete-todo/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  const handleSaveEditedTask = async (id, updatedData) => {
    try {
      await api.patch(`/todo/update-todo/${id}`, updatedData);

      // Update UI
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
      );

      // Close modal
      setShowModal(false);
      setTaskToEdit(null);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleEdit = (id) => {
    const selectedTask = tasks.find((t) => t._id === id);
    setTaskToEdit(selectedTask);
    setShowModal(true);
  };

  const filteredTasks = tasks?.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "Medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      default:
        return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20";
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* ===============================
          FULL-SCREEN PARTY POPPER BURST
         =============================== */}
      <AnimatePresence>
        {showBurst && (
          <motion.div
            key="burst-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] pointer-events-none flex items-center justify-center"
            ref={burstRef}
          >
            {/* subtle dark overlay to make particles pop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.36 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            />

            {/* flash / burst center */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute w-56 h-56 rounded-full bg-amber-100/50 filter blur-3xl"
            />

            {/* shockwave ring */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "circOut" }}
              className="absolute w-24 h-24 rounded-full border-2 border-emerald-500/80"
            />

            {/* center pop icon (no white box) */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.2 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative z-50 text-white drop-shadow-2xl"
            >
              <CheckCircle2 size={96} className="text-emerald-500" />
            </motion.div>

            {/* confetti particles */}
            {particles?.map((p) => (
              <motion.span
                key={`p-${p.id}-${p.x.toFixed(0)}`}
                initial={{ x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  rotate: p.rotate + (Math.random() > 0.5 ? 360 : -360),
                  scale: [1, 1.1, 0.6],
                  opacity: 0,
                }}
                transition={{
                  duration: 1.05,
                  delay: p.delay,
                  ease: [0.2, 0.75, 0.25, 1],
                }}
                style={{
                  width: p.size,
                  height: p.size * 0.6,
                  background: p.color,
                  borderRadius: 2,
                  zIndex: 60,
                  transformOrigin: "center",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
                }}
                className="absolute"
              />
            ))}

            {/* ribbons - longer curling pieces */}
            {ribbons.map((r) => (
              <motion.div
                key={`r-${r.id}-${r.x.toFixed(0)}`}
                initial={{
                  x: 0,
                  y: 0,
                  rotate: r.rotate - 30,
                  scale: 1,
                  opacity: 1,
                }}
                animate={{
                  x: r.x,
                  y: r.y,
                  rotate: r.rotate + (Math.random() > 0.5 ? 180 : -180),
                  skewX: 20,
                  opacity: 0,
                }}
                transition={{
                  duration: 1.2,
                  delay: r.delay,
                  ease: [0.25, 0.9, 0.3, 1],
                }}
                style={{
                  width: r.width,
                  height: r.length,
                  background: `linear-gradient(135deg, ${r.color}, #ffffff00)`,
                  borderRadius: 8,
                  zIndex: 55,
                  transformOrigin: "top center",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
                }}
                className="absolute"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8C00FF] transition-all"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 p-1.5 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <Filter />
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTasks?.map((task) => (
            <motion.div
              key={task._id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className={`relative p-6 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all duration-200 ${
                task.isCompleted ? "opacity-75" : ""
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <h3
                  className={`text-lg font-semibold ${
                    task.isCompleted
                      ? "line-through text-slate-500 dark:text-slate-400"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                {task.description}
              </p>

              <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                <p>
                  Deadline:{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {new Date(task.deadline).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      task.isCompleted ? "text-emerald-500" : "text-amber-500"
                    }`}
                  >
                    {task.isCompleted ? "Completed" : "Pending"}
                  </span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-start gap-3">
                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleToggleComplete(task._id)}
                  className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition-all duration-200 ${
                    task.isCompleted
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-emerald-100 dark:hover:bg-emerald-900/30 hover:text-emerald-600"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {task.isCompleted ? "Undo" : "Mark Done"}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleEdit(task._id)}
                  className="cursor-pointer px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-all flex items-center gap-1"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleDelete(task._id)}
                  className="cursor-pointer px-3 py-2 rounded-lg text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredTasks?.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 mt-10">
          No tasks found.
        </p>
      )}
      {showModal && (
        <AddNewTask
          onChangeAddNewTaskModel={() => {
            setShowModal(false);
            setTaskToEdit(null);
          }}
          editTask={taskToEdit}
          onSave={handleSaveEditedTask}
        />
      )}
    </div>
  );
};

export default AllTasks;
