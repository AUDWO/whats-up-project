import styled from "styled-components";

export const MakeStoryModal = styled.div`
  position:fixed;
  z-index: 17;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}
`;

export const MakeStoryWrapper = styled.div`
  display: flex;
  position: absolute;
  z-index: 20;
  width: 800px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  opacity: 1;
`;
