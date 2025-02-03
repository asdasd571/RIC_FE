import styled from "styled-components";
import { useState } from "react";
import { DropdownProps } from "../../types/Dropdown.types";

const Select = styled.select`
  box-sizing: border-box;
  margin: 0;

  padding: 0.3125rem;
  width: 100%;
  display: block;
  min-height: 1.25rem;
  height: 100%;

  font-size: 0.9375rem;
  line-height: inherit;
  border: 1px solid #cccccc;
  border-radius: 0.3125rem;
  background-color: #ffffff;

  &:focus {
    border-color: #59a5f5;
    cursor: pointer;
  }

  &:hover {
    /* background-color: #598ef3; */
    cursor: pointer;
  }
`;

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  setSelectedValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(String(e.target.value)); // 선택된 값을 숫자로 변환
  };

  return (
    <Select onChange={handleChange} value={selectedValue}>
      {options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

export default Dropdown;
