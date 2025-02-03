import styled from "styled-components";

// // focus 시에 border-color를 red로 변경
// // * 커스텀 스타일
export const Select = styled.select`
  box-sizing: border-box;
  padding: 10px;
  margin: 0;

  max-width: max-content;

  display: block;
  min-height: 20px;
  /* width: 100%; */
  padding: 8px 8px;
  font-size: auto;
  line-height: inherit;
  border: 1px solid;
  border-radius: 4px;
  color: inherit;
  background-color: transparent;
  transition: background-color 0.3s ease; // 애니메이션 효과주기

  /* 기본 화살표 아이콘 비활성화 */
  /* -webkit-appearance: none;
	-moz-appearance: none;
	appearance: none; */

  /* foucs시, border를 빨간색으로 변경. */
  &:focus {
    border-color: blue;
  }

  &:hover {
    background-color: #598ef3;
  }
`;
