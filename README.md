# sudoku
数独 破解
暴力破解,二维数组
算法:
1.按行找到未填写的所有数字,
2.每行的未填数字进行全排列
3.所有行的排列 再进行组合
4.每一个组合尝试放入原数独数据中,检验是否符合规则:行/列/块不重复