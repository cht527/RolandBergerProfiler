module.exports = {
	types: [
		{
			value: 'feat',
			name: 'feat: A new feature',
		},
		{
			value: 'fix',
			name: 'fix: A bug fix',
		},
		{
			value: 'docs',
			name: 'docs: Documentation only changes',
		},
		{
			value: 'refactor',
			name: 'refactor: A code change that neither fixes a bug nor adds a feature',
		},
		{
			value: 'perf',
			name: 'perf: A code change that improves performance',
		},
		{
			value: 'test',
			name: 'test: Add missing tests or correcting existing tests',
		},
		{
			value: 'build',
			name: 'build: Add missing tests or correcting existing tests',
		},
		{
			value: 'revert',
			name: 'revert: Revert to a commit',
		},
	],
	allowBreakingChanges: ['feat', 'fix', "docs", 'refactor', 'perf',],
};
