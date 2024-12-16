module.exports = {
    reporters: [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Relatório de Testes",
          outputPath: "./test-report.html",
          includeFailureMsg: true,
          includeConsoleLog: true,
        },
      ],
    ],
  };
  