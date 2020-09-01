import React from "react";
import styled from "styled-components";
import { AddButton } from "../Style/AddButton";
import { CountItem } from "../Modal/CountItem";
import { useCount } from "../Hooks/useCount";
import { totalPriceItems } from "../functions/secondaryFunctions";
import { toLocaleStr } from "../functions/secondaryFunctions";
import { Toppings } from "./Toppings";
import { useToppings } from "../Hooks/useTopping";

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const Modal = styled.div`
  background-color: white;
  width: 600px;
  height: 600px;
  position: relative;
`;

const Banner = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${({ img }) => img});
  background-size: cover;
  background-position: center;
`;

const Content = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 200px);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "Pacifico", cursive;
  font-size: 24px;
  font-weight: 700;
`;

const TotalPriceItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalItem = ({ openItem, setOpenItem, orders, setOrders }) => {
  const counter = useCount();
  const toppings = useToppings(openItem);

  const closeModal = (e) => {
    if (e.target.id === "overlay") {
      setOpenItem(null);
    }
  };

  const order = {
    ...openItem,
    count: counter.count,
    topping: toppings.toppings,
  };

  const addToOrder = () => {
    setOrders([...orders, order]);
    setOpenItem(null);
  };

  return (
    <Overlay id="overlay" onClick={closeModal}>
      <Modal>
        <Banner img={openItem.img} />
        <Content>
          <HeaderContent>
            <div>{openItem.name}</div>
            <div>{toLocaleStr(openItem.price)}</div>
          </HeaderContent>
          <CountItem {...counter} />
          {openItem.toppings && <Toppings {...toppings}/>}
          <TotalPriceItem>
            <span>Price:</span>
            <span>{toLocaleStr(totalPriceItems(order))}</span>
          </TotalPriceItem>
          <AddButton onClick={addToOrder}>Add</AddButton>
        </Content>
      </Modal>
    </Overlay>
  );
};