/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

/*
<<item>>
content
position
*/

type Item = { color: string; x: number; y: number };
// type Position = { x: number; y: number };

export default function ItemField() {
  //   const [field, setField] = useState(5);
  const [items, setItems] = useState<Item[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [move, setMove] = useState(0);
  const field = 10;

  const genBlock = () => {
    const temp: Item[] = [];
    for (let i = 0; i < field; i++) {
      for (let j = 0; j < field; j++) {
        const rand = Math.floor(Math.random() * 5);
        let color = "";
        switch (rand) {
          case 0:
            color = "#f006";
            break;
          case 1:
            color = "#00f6";
            break;
          case 2:
            color = "#0f06";
            break;
          case 3:
            color = "#0ff6";
            break;
          case 4:
            color = "#ff06";
            break;
          default:
            break;
        }
        temp.push({ color: color, x: i + 1, y: j + 1 });
      }
    }
    setItems(temp);
  };

  const initial = () => {
    genBlock();
    setSelected([]);
    setMove(0);
  };

  useEffect(() => {
    initial();
  }, []);

  const checkY = () => {
    console.clear();
    for (let y = 1; y <= field; y++) {
      let count: any = {};
      items.forEach((i, index) => {
        if (i.y === y) {
          if (i.color in count) {
            count[i.color] += 1;
          } else {
            count[i.color] = 1;
          }
        }
      });
      console.log(count);
    }
  };

  const checkSelect = (index: number) => {
    return selected.includes(index);
  };

  const swap = (index: number) => {
    setSelected((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;
      const fitem = items[first];
      const sitem = items[second];
      const canMove: { x: number; y: number }[] = [
        { x: fitem.x - 1, y: fitem.y },
        { x: fitem.x + 1, y: fitem.y },
        { x: fitem.x, y: fitem.y - 1 },
        { x: fitem.x, y: fitem.y + 1 },
      ];
      const newPosition = { x: sitem.x, y: sitem.y };
      if (canMove.some((i) => i.x === newPosition.x && i.y === newPosition.y)) {
        checkY();
        const temp = items[first].color;
        items[first].color = items[second].color;
        items[second].color = temp;
        setMove(move + 1);
      }
      setSelected([]);
    }
  }, [selected]);

  return (
    <Box>
      <Text>Item Field</Text>
      <Text>current move: {move}</Text>
      <Button onClick={initial}>Regen</Button>
      <Button onClick={checkY}>Check Y</Button>
      <Grid
        templateColumns={`repeat(${field},1fr)`}
        templateRows={`repeat(${field},1fr)`}
        border="1px solid black"
        w="fit-content"
        gap="5px"
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
            >
              {i.x},{i.y}
            </Box>
          );
        })}
      </Grid>
    </Box>
  );
}
