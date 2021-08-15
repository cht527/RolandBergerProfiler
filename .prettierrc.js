// .prettierrc.js
module.exports = {
	// 最大长度80个字符
	printWidth: 80,
	// 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	singleQuote: true,
	// 行末分号, 默认true
	semi: true,
	trailingComma: 'all',
	// 在对象文字中打印括号之间的空格。 默认true
	bracketSpacing: true,
	// 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
	insertPragma: false,
	// 行尾换行格式
	endOfLine: 'auto',
	// html空格敏感度
	htmlWhitespaceSensitivity: 'ignore',
	// tab缩进大小,默认为2
	tabWidth: 2,
	// 使用tab缩进还是空格，默认false
	useTabs: true,
};
