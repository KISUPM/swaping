/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Item = { color: string; c: number; r: number };

export default function ItemField() {
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [move, setMove] = useState(0);
  const field = 5;

  const sleep = (s: number) => {
    return new Promise((resolve) => setTimeout(resolve, s * 1000));
  };

  const genBlock = () => {
    const temp: Item[] = [];
    for (let i = 0; i < field; i++) {
      for (let j = 0; j < field; j++) {
        const rand = Math.floor(Math.random() * 5);
        let color = "";
        switch (rand) {
          case 0:
            color = "#f008";
            break;
          case 1:
            color = "#00f8";
            break;
          case 2:
            color = "#0f08";
            break;
          case 3:
            color = "#0ff8";
            break;
          case 4:
            color = "#ff08";
            break;
          default:
            break;
        }
        temp.push({ color: color, c: j + 1, r: i + 1 });
      }
    }
    setItems(temp);
  };

  const initial = () => {
    genBlock();
    setSelected([]);
    setMove(0);
    setScore(0);
  };

  useEffect(() => {
    initial();
  }, []);

  const checkY = () => {
    const temp = items;
    for (let c = 1; c <= field; c++) {
      let currentColor = "";
      let currentColorIndex: number[] = [];
      temp.forEach((i, index) => {
        if (i.c === c) {
          if (i.color === currentColor) {
            currentColorIndex.push(index);
          } else {
            currentColor = i.color;
            if (currentColorIndex.length > 2) {
              currentColorIndex.forEach((i) => (temp[i].color = "#0003"));
              setScore(score + currentColorIndex.length * 100);
            }
            currentColorIndex = [];
            currentColorIndex.push(index);
          }
        }
      });
      if (currentColorIndex.length > 2) {
        setScore(score + currentColorIndex.length * 100);
        currentColorIndex.forEach((i) => (temp[i].color = "#0003"));
      }
    }
    felldown();
    setItems(temp);
  };

  const checkX = () => {
    const temp = items;
    for (let r = 1; r <= field; r++) {
      let currentColor = "";
      let currentColorIndex: number[] = [];
      temp.forEach((i, index) => {
        if (i.r === r) {
          if (i.color === currentColor) {
            currentColorIndex.push(index);
          } else {
            currentColor = i.color;
            if (currentColorIndex.length >= 3) {
              currentColorIndex.forEach((i) => (temp[i].color = "#0003"));
              setScore(score + currentColorIndex.length * 100);
            }
            currentColorIndex = [];
            currentColorIndex.push(index);
          }
        }
      });
      if (currentColorIndex.length > 2) {
        currentColorIndex.forEach((i) => (temp[i].color = "#0003"));
        setScore(score + currentColorIndex.length * 100);
      }
    }
    felldown();
    setItems(temp);
  };

  const felldown = () => {
    const temp = [...items];

    for (let c = 1; c <= field; c++) {
      let onlyColor: string[] = [];
      let column: number[] = [];
      temp.forEach((i, index) => {
        if (i.c === c) {
          column.push(index);
          if (i.color !== "#0003") {
            onlyColor.push(i.color);
          }
        }
      });
      while (onlyColor.length !== field) {
        onlyColor.unshift("#fff");
      }
      column.forEach((i, index) => {
        temp[i].color = onlyColor[index];
      });
      // console.log(onlyColor);
    }
    const FillTemp = [...fillEmpty(temp)];
    setItems(FillTemp);
  };

  const fillEmpty = (array: Item[]) => {
    const temp = [...array];
    temp.forEach((i, index) => {
      if (i.color === "#fff") {
        const rand = Math.floor(Math.random() * 5);
        let color = "";
        switch (rand) {
          case 0:
            color = "#f008";
            break;
          case 1:
            color = "#00f8";
            break;
          case 2:
            color = "#0f08";
            break;
          case 3:
            color = "#0ff8";
            break;
          case 4:
            color = "#ff08";
            break;
          default:
            break;
        }
        temp[index].color = color;
      }
    });
    return temp;
  };

  const checkSelect = (index: number) => {
    return selected.includes(index);
  };

  const swap = (index: number) => {
    setSelected((prev) => [...prev, index]);
  };

  useEffect(() => {
    const tempAll = [...items];
    if (selected.length === 2) {
      const [first, second] = selected;
      const fitem = tempAll[first];
      const sitem = tempAll[second];
      const canMove: { c: number; r: number }[] = [
        { c: fitem.c - 1, r: fitem.r }, //swap left
        { c: fitem.c + 1, r: fitem.r }, //swap right
        { c: fitem.c, r: fitem.r - 1 }, //swap down
        { c: fitem.c, r: fitem.r + 1 }, //swap up
      ];
      const newPosition = { c: sitem.c, r: sitem.r };
      if (
        canMove.some((i) => i.c === newPosition.c && i.r === newPosition.r) &&
        fitem.color !== sitem.color
      ) {
        const temp = tempAll[first].color;
        tempAll[first].color = tempAll[second].color;
        tempAll[second].color = temp;
        checkX();
        checkY();
        setMove(move + 1);
      }
      setItems(tempAll);
      setSelected([]);
    }
  }, [selected]);

  useEffect(() => {
    // console.clear();
    checkX();
    checkY();
    // felldown();
  }, [items]);

  return (
    <Box>
      <Text>Item Field</Text>
      <Text>current move: {move}</Text>
      <Button onClick={initial}>Regen</Button>
      <Button onClick={checkY}>Check Y</Button>
      <Button onClick={checkX}>Check X</Button>
      <Button onClick={console.clear}>Clear Log</Button>
      <Text>Position : (c,r)</Text>
      <Text>Score : {score}</Text>
      <Grid
        templateColumns={`repeat(${field},1fr)`}
        templateRows={`repeat(${field},1fr)`}
        border="1px solid black"
        w="fit-content"
        m="auto"
        gap="0.25rem"
        p="0.25rem"
        color="#000"
        bg="#fff"
      >
        {items.map((i, index) => {
          return (
            <Box
              key={index}
              bg={i.color}
              border={checkSelect(index) ? "3px solid red" : "1px solid black"}
              w="50px"
              h="50px"
              cursor="pointer"
              onClick={() => swap(index)}
              // onMouseEnter={() => console.log(i.c, i.r)}
            >
              {i.c},{i.r}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
