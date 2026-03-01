import { useTheme } from "next-themes";
import { Sun, Moon, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 justify-start contain-content">
      <motion.button
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-xl border text-black dark:text-gray-50"
      >
        {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </motion.button>

      <Link href="/" className="text-sm text-right block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex gap-2 p-2 rounded-xl border text-black dark:text-gray-50"
        >
          {" "}
          <Home />
        </motion.button>
      </Link>

      <Link href="/everdell" className="text-sm text-right block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex rounded-xl"
        >
          <Image
            className="rounded-xl"
            alt="Everdell Sprite"
            src="/architect.png"
            width={38}
            height={38}
          />
        </motion.button>
      </Link>

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
