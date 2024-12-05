import React from "react";
import "./Table.css";

export default function Table() {
  const data = [
    {
      ID: "1234567",
      subjectId: "U110",
      classId: "مايو2023",
      degree: "0",
      status: "غ",
      failCount: "1",
      case: "غ",
    },
    {
      ID: "1234567",
      subjectId: "ر110",
      classId: "سبتمبر2023",
      degree: "92",
      status: "أ",
      failCount: "1",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر110",
      classId: "يناير2023",
      degree: "53",
      status: "ر",
      failCount: "1",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر131",
      classId: "يناير2023",
      degree: "84",
      status: "ب",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر132",
      classId: "مايو2023",
      degree: "83",
      status: "ب",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر170",
      classId: "مايو2023",
      degree: "64",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر211",
      classId: "يناير2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر212",
      classId: "مايو2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر213",
      classId: "مايو2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر231",
      classId: "يناير2024",
      degree: "70",
      status: "ج",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر232",
      classId: "مايو2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر241",
      classId: "مايو2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر271",
      classId: "سبتمبر2024",
      degree: "30",
      status: "ر",
      failCount: "2",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر271",
      classId: "يناير2024",
      degree: "19",
      status: "ر",
      failCount: "2",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ر272",
      classId: "مايو2024",
      degree: "68",
      status: "ج",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "س101",
      classId: "مايو2023",
      degree: "85",
      status: "أ",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "س201",
      classId: "سبتمبر2024",
      degree: "72",
      status: "ج",
      failCount: "1",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "س201",
      classId: "يناير2024",
      degree: "32",
      status: "ر",
      failCount: "1",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "س202",
      classId: "مايو2024",
      degree: "60",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ص100",
      classId: "يناير2023",
      degree: "71",
      status: "ج",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ص201",
      classId: "يناير2024",
      degree: "61",
      status: "د",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ع103",
      classId: "يناير2023",
      degree: "82",
      status: "ب",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ع104",
      classId: "يناير2023",
      degree: "88",
      status: "أ",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ف101",
      classId: "يناير2023",
      degree: "70",
      status: "ج",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ف102",
      classId: "مايو2023",
      degree: "76",
      status: "ب",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ك101",
      classId: "يناير2023",
      degree: "84",
      status: "ب",
      failCount: "0",
      case: "",
    },
    {
      ID: "1234567",
      subjectId: "ك102",
      classId: "مايو2023",
      degree: "75",
      status: "ب",
      failCount: "0",
      case: "",
    },
  ];

  return (
    <div>
      <h1>السجل الأكاديمي</h1>
      <table
        cellspacing="0"
        cellpadding="3"
        rules="all"
        id="ContentPlaceHolder2_GridView1"
        dir="rtl"
        style={{
          color: "Black",
          backgroundColor: "White",
          borderColor: "#999999",
          borderWidth: 1,
          borderStyle: "Solid",
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr className="table-header">
            <th scope="col">كود الطالب</th>
            <th scope="col">كود المادة</th>
            <th scope="col">الفصل الدراسي</th>
            <th scope="col">الدرجة</th>
            <th scope="col">الرمز</th>
            <th scope="col">عدد مرات الرسوب</th>
            <th scope="col">حالة الطالب</th>
          </tr>
          {data.map((d, i) => (
            <tr className={i % 2 === 0 && "alt-color"}>
              <td>{d.ID}</td>
              <td>{d.subjectId}</td>
              <td>{d.classId}</td>
              <td>{d.degree}</td>
              <td>{d.status}</td>
              <td>{d.failCount}</td>
              <td>{d.case}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
