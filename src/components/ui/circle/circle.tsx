import React from "react";
import styles from "./circle.module.css";
import { ElementStates } from "../../../types/element";

interface CircleProps {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: "string" | "element";
  extraClass?: string;
  isSmall?: boolean;
}

export const Circle: React.FC<CircleProps> = ({
  state = ElementStates.Default,
  letter,
  head,
  index,
  tail,
  extraClass = "",
  isSmall,
}) => {
  return (
    <div className={`${styles.content} ${extraClass}`} data-cy={'circleContainer'}>
      <div
        className={`text text_type_input text_color_input mb-4 ${
          styles.absolute
        } ${styles.head} ${
          styles[typeof head === "string" ? "string" : "element"]
        }`}
        data-cy={'circleHead'}
      >
        {head}
      </div>
      <div
        className={`${styles.circle}  ${isSmall ? styles.small : ""} ${
          styles[state]
        }`}
        data-cy={"circle"}
      >
        <p
          className={`text text_type_circle text_color_input ${styles.letter}`}
        >
          {letter}
        </p>
      </div>
      <p
        className={`text text_type_input text_color_input mt-4 ${styles.absolute} ${styles.index}`}
        data-cy={'circleIndex'}
      >
        {index?.toString()}
      </p>
      <div
        className={`text text_type_input text_color_input mt-4 ${
          styles.absolute
        } ${index?.toString() ? styles.tail60 : styles.tail30} ${
          styles[typeof tail === "string" ? "string" : "element"]
        }`}
        data-cy={'circleTail'}
      >
        {tail}
      </div>
    </div>
  );
};
