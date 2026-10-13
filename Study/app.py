import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

st.set_page_config(page_title="Quản lý điểm sinh viên", layout="wide")

data = {
    "Họ và tên": ["Nguyễn Thành Đạt", "Trương Quốc Đạt", "Nguyễn Tuấn Anh", "Lê Minh Chi", "Hoàng Thu Hà",
                  "Vũ Ngọc Lan", "Đặng Quang Minh", "Bùi Hải Nam", "Ngô Gia Phúc", "Lý Thu Trang"],
    "Chuyên cần": [9, 8, 7, 10, 8, 5, 9, 7, 8, 10],
    "Giữa kỳ": [8, 8.5, 6, 9, 7, 4.5, 8.5, 6.5, 7.5, 9],
    "Cuối kỳ": [7.5, 8.2, 6, 9, 6.8, 4.4, 8.6, 6.3, 7.3, 9.3]
}

df = pd.DataFrame(data)

df["Tổng kết"] = (0.2 * df["Chuyên cần"] + 0.3 * df["Giữa kỳ"] + 0.5 * df["Cuối kỳ"]).round(2)


def xep_loai(diem):
    if diem >= 8.5:
        return "Giỏi"
    elif diem >= 7.0:
        return "Khá"
    elif diem >= 5.0:
        return "Trung bình"
    return "Yếu"


df["Xếp loại"] = df["Tổng kết"].apply(xep_loai)

diem_tb = df["Tổng kết"].mean()
sv_cao = df.loc[df["Tổng kết"].idxmax()]
sv_thap = df.loc[df["Tổng kết"].idxmin()]
so_dat = int((df["Tổng kết"] >= 5).sum())

st.title("QUẢN LÝ ĐIỂM SINH VIÊN")

st.subheader("Bảng điểm lớp")
st.dataframe(df, width="stretch", hide_index=True)

st.subheader("Thống kê")
c1, c2, c3, c4 = st.columns(4)
c1.metric("Điểm trung bình lớp", f"{diem_tb:.2f}")
c2.metric("Cao nhất", f"{sv_cao['Tổng kết']}")
c2.caption(sv_cao["Họ và tên"])
c3.metric("Thấp nhất", f"{sv_thap['Tổng kết']}")
c3.caption(sv_thap["Họ và tên"])
c4.metric("Số sinh viên đạt", f"{so_dat}/{len(df)}")

st.subheader("Tra cứu sinh viên")
ten = st.selectbox("Chọn sinh viên", df["Họ và tên"])
sv = df[df["Họ và tên"] == ten].iloc[0]

d1, d2, d3, d4, d5 = st.columns(5)
d1.metric("Chuyên cần", sv["Chuyên cần"])
d2.metric("Giữa kỳ", sv["Giữa kỳ"])
d3.metric("Cuối kỳ", sv["Cuối kỳ"])
d4.metric("Tổng kết", sv["Tổng kết"])
d5.metric("Xếp loại", sv["Xếp loại"])

st.subheader("Biểu đồ điểm tổng kết")
fig, ax = plt.subplots(figsize=(9, 5))
ax.barh(df["Họ và tên"], df["Tổng kết"], color="#4a86e8")
ax.set_title("Điểm tổng kết của 10 sinh viên")
ax.set_xlabel("Điểm tổng kết")
ax.set_ylabel("Sinh viên")
ax.set_xlim(0, 10)
ax.invert_yaxis()
fig.tight_layout()
st.pyplot(fig)

st.markdown("---")
st.markdown("<p style='font-size:12px;'>Họ và tên: xkahgignore - MSSV: 12102008</p>", unsafe_allow_html=True)