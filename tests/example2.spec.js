const {test} = require('@playwright/test')

test.describe("commonjs file",()=>{

  test('test in commonjs file', async () => {
    console.log("Hello from commonjs file")
  });

})

