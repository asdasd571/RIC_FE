import styles from "./PrintAppTable.module.scss";
import { PrintTableData } from "../../../types/PrintAppTable.types";

interface PrintTableProps {
  data?: PrintTableData;
}

const tempData: PrintTableData = {
  theadPrintData: [
    //print용 데이터
    "Name",
    "Version",
    "Vendor",
    "Service Type",
    "State",
    "Desc",
  ],
  theadData: [
    "name",
    "version",
    "vendor",
    "ServiceType",
    "state",
    "description",
  ],
  tableData: [
    {
      ServiceType: "http://129.254.220.111:9096",
      description: "TEST",
      id: "xSMB",
      name: "xSMB",
      open: "http://129.254.220.111:9096",
      state: "ON",
      vendor: "ETRI",
      version: "v1.0.0",
    },
    {
      ServiceType: "http://129.254.220.111:20250",
      description: "TEST",
      id: "xDMB",
      name: "xDMB",
      open: "http://129.254.220.111:20250",
      state: "ON",
      vendor: "ETRI",
      version: "v1.0.0",
    },
    {
      ServiceType: "http://129.254.220.111:8080",
      description: "TEST",
      id: "xAPB",
      name: "xAPB",
      open: "http://129.254.220.111:8080",
      state: "ON",
      vendor: "ETRI",
      version: "v1.0.0",
    },
  ],
};

//* 각각 클릭시 적절한 페이지로 이동
const handleClickGoPage = (url: string) => {
  window.open(url, "_blank"); // 창 오픈
  // window.location.href= url; // 탭 오픈
};

const PrintAppTable: React.FC<PrintTableProps> = ({ data = tempData }) => {
  const { theadData, theadPrintData, tableData } = data;

  return (
    <section className={styles.table_container}>
      <table>
        <thead>
          <tr>
            {theadPrintData.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, rowIndex) => (
            <tr
              key={rowData.id || rowIndex}
              onClick={() => handleClickGoPage(rowData.open)}
            >
              {theadData.map((key, colIndex) => (
                <td key={colIndex}>
                  {key === "state" ? (
                    <div className={styles.state_container}>
                      <span // state가 ON이면 초록색, OFF면 빨강색 동그라미로 나타낸다.
                        className={`${styles.state} ${rowData[key] === "ON" ? "" : styles.off}`}
                      ></span>
                    </div>
                  ) : (
                    rowData[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default PrintAppTable;
