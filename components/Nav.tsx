import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 justify-start ">
      <motion.button
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-xl border text-black dark:text-gray-50"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.button>

      <Link href="/history" className="text-sm text-right block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex gap-2 p-2 rounded-xl border text-black dark:text-gray-50"
        >
          {" "}
          View History →
        </motion.button>
      </Link>
    </div>
  );
}
