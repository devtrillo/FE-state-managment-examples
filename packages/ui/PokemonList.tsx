import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Pokemon } from "types";
type Props = {
  pokemons: Pokemon;
};

const itemVariants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.25,
    },
  }),
  hidden: { opacity: 0 },
};

const PokeCard = ({ name, id }: { name: string; id: number }) => {
  return (
    <motion.li
      custom={id}
      key={name}
      className="rounded-lg shadow m-2 p-4 hover:shadow-2xl cursor-pointer active:shadow-sm active:scale-75 transition-all flex-wrap dark:bg-gray-800"
      initial={"hidden"}
      animate={"visible"}
      variants={itemVariants}
    >
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          id + 1
        }.png`}
      />
      <span className="capitalize">{name}</span>
    </motion.li>
  );
};

export const PokeList: FC<Props> = ({ pokemons = [] }) => (
  <section className="flex-1">
    <ul className="flex flex-wrap items-center justify-center">
      {pokemons.map(({ name }, index) => (
        <PokeCard key={name} name={name} id={index} />
      ))}
    </ul>
  </section>
);
