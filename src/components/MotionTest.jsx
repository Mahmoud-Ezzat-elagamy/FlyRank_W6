import { motion, useAnimate } from "motion/react";
import { useEffect, useState } from "react";

async function randomIntArray(size = 10, min = 10, max = 100, shouldFail = false) {

    // simulate api call
    await new Promise((resolve) => setTimeout(resolve, 1600));
    if (shouldFail) {
        throw new Error("Network Error: Failed to fetch numbers");
    }
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    console.log(arr);
    return arr;
}

export default function MotionTest() {

    const [buttonRef, animate] = useAnimate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [simulateError, setSimulateError] = useState(false);
    const [error, setError] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [isDanger, setIsDanger] = useState(false);

    const handleGenerate = () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        randomIntArray(10, 10, 100, simulateError)
            .then((arr) => {
                setData(arr);
                setHasError(false);
                setIsDanger(false)
            })
            .catch((err) => {
                setError(err.message);
                setData([]);
                setHasError(true);

                // Danger color for 2000ms (2s)
                setIsDanger(true);

                // Trigger vibration on error only (1.2s), never touches entrance animation
                animate(
                    buttonRef.current,
                    { x: [0, -10, 10, -8, 8, -6, 6, -3, 3, 0] },
                    { duration: 1, ease: "easeInOut" }
                );
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        handleGenerate();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.5, y: 15 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.35, ease: "easeOut" },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-slate-100 gap-6">
            <div className="w-125 flex items-center justify-between">
                {/* Trigger on the left */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none text-sm text-slate-300">
                    <input
                        type="checkbox"
                        checked={simulateError}
                        onChange={(e) => setSimulateError(e.target.checked)}
                        className="w-4 h-4 accent-rose-500 rounded cursor-pointer"
                    />
                    <span>Simulate network error</span>
                </label>

                {/* Generate button on the right */}
                <motion.button
                    ref={buttonRef}
                    onClick={handleGenerate}
                    disabled={loading}
                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                        duration: 0.6,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={loading ? {} : { scale: 1.05 }}
                    whileTap={loading ? {} : { scale: 0.95 }}
                    whileFocus={{ scale: 1.05, boxShadow: "0 0 0 4px rgba(34, 197, 94, 0.3)" }}
                    className={`px-6 py-3 rounded-xl text-white font-medium shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-38 transition-colors ${isDanger
                        ? "bg-rose-600 shadow-rose-600/30"
                        : "bg-linear-to-r from-cyan-500 to-blue-600"
                        }`}
                >
                    {loading
                        ? "generating..."
                        : hasError
                            ? "generate again"
                            : "generate nums"}
                </motion.button>
            </div>

            <motion.div
                key={error ? "error" : JSON.stringify(data)}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-125 max-h-125 border border-slate-800 rounded-2xl bg-slate-900/50 p-6 flex flex-wrap gap-3 overflow-auto"
            >
                {error ? (
                    <div className="w-full text-center text-rose-400 text-sm font-medium py-4">
                        {error}
                    </div>
                ) : (
                    data.map((val, idx) => (
                        <motion.span
                            key={idx}
                            variants={itemVariants}
                            className="px-3 py-1.5 bg-slate-800 rounded-lg font-mono text-sm"
                        >
                            {val}
                        </motion.span>
                    ))
                )}
            </motion.div>
        </div>
    )
}