module.exports = {
  ci: {
    collect: {
      url: [
        "https://www.meagle360.com/",
        "https://www.meagle360.com/blog",
        "https://www.meagle360.com/pricing",
        "https://www.meagle360.com/features/payroll-software",
        "https://www.meagle360.com/features/employee-database-software",
        "https://www.meagle360.com/tools/payslip-generator",
        "https://www.meagle360.com/tools/quotation-maker",
      ],
      numberOfRuns: 1,
    },
    assert: {
      assertions: {
        "categories:seo": ["warn", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.7 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
