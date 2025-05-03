import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function WallBlock({ image, title, message, align }) {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    const isLeft = align === "left";

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`flex flex-col sm:flex-row items-center justify-between gap-6 my-12 ${
                isLeft ? "" : "sm:flex-row-reverse"
            }`}
            ref={ref}
        >
            {/* Image */}
            <div className="w-full sm:w-1/2 flex justify-center mb-4 sm:mb-0">
                <img
                    src={image}
                    alt={title || "Mom image"}
                    className="w-full max-w-xs sm:max-w-sm rounded-xl border-4 border-yellow-500 shadow-xl"
                />
            </div>

            {/* Text */}
            <div className="w-full sm:w-1/2 text-center sm:text-left">
                {title && (
                    <h2 className="text-2xl sm:text-3xl font-bold text-pink-700 mb-2">
                        {title}
                    </h2>
                )}
                <p className="text-lg sm:text-xl text-gray-700">{message}</p>
            </div>
        </motion.div>
    );
}
