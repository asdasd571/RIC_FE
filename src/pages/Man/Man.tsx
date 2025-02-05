import React, { useState, useEffect } from "react";
import axios from "axios";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080/man", // Flask API 서버 URL
  headers: {
    "Content-Type": "application/json",
  },
});

const Man = () => {
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [logData, setLogData] = useState<any>([]);
  const [allData, setAllData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // 특정 키의 데이터를 불러오는 함수
  const handleRead = async () => {
    try {
      if (!key) {
        setError("Key is required");
        return;
      }
      const response = await api.get(`/read?key=${key}`);
      setLogData([response.data]);
    } catch (err) {
      setError("Key not found or server error");
    }
  };

  // 데이터를 저장하는 함수
  const handleWrite = async () => {
    try {
      const data = { key, value };
      if (!key || !value) {
        setError("Key and value are required");
        return;
      }
      const response = await api.post("/write", data);
      setLogData([response.data]);
    } catch (err) {
      setError("Error saving data");
    }
  };

  // 모든 데이터를 불러오는 함수
  const handleReadAll = async () => {
    try {
      const response = await api.get("/read-all");
      setAllData(response.data);
    } catch (err) {
      setError("Error fetching all data");
    }
  };

  // 모든 데이터를 덮어쓰는 함수
  const handleWriteAll = async () => {
    try {
      const data = JSON.parse(value); // 입력된 값을 JSON으로 파싱
      if (typeof data !== "object" || Array.isArray(data)) {
        setError("Invalid JSON format");
        return;
      }
      const response = await api.post("/write-all", data);
      setLogData([response.data]);
    } catch (err) {
      setError("Error saving all data");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>JSON 데이터 저장 및 불러오기</h1>

      {/* Key와 Value 입력 */}
      <div>
        <h2>데이터 쓰기</h2>
        <input
          type="text"
          placeholder="키 입력"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <textarea
          placeholder="값 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleWrite}>저장</button>
      </div>

      {/* 특정 Key의 데이터 불러오기 */}
      <div>
        <h2>데이터 읽기</h2>
        <input
          type="text"
          placeholder="키 입력"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button onClick={handleRead}>불러오기</button>
        <div>
          <h3>읽은 데이터:</h3>
          {logData.length > 0 ? (
            <pre>{JSON.stringify(logData, null, 2)}</pre>
          ) : (
            <p>데이터 없음</p>
          )}
        </div>
      </div>

      {/* 모든 데이터 읽기 */}
      <div>
        <h2>모든 데이터 읽기</h2>
        <button onClick={handleReadAll}>모두 불러오기</button>
        <div>
          <h3>모든 데이터:</h3>
          {allData ? (
            <pre>{JSON.stringify(allData, null, 2)}</pre>
          ) : (
            <p>모든 데이터가 없습니다.</p>
          )}
        </div>
      </div>

      {/* 모든 데이터 덮어쓰기 */}
      <div>
        <h2>모든 데이터 덮어쓰기</h2>
        <textarea
          placeholder="JSON 형태로 데이터 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleWriteAll}>모두 저장</button>
      </div>

      {/* 오류 처리 */}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default Man;
