const{ Builder,By,Key,util} =require ("selenium-webdriver");
var assert =require('assert');
const url = require('url');
//const window = require('window');
async function setup(){
    let driver= await new Builder().forBrowser("chrome").build();
    await driver.get("https://dev.agent.openbrix.co.uk/login");
    return driver;
}

async function loginwithoutCred(){
    driver=await setup();
    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actSignIn=await driver.findElement(By.id("email-helper-text")).getText();
    assert.equal(actSignIn,"This field is required");//pass
}
// with url
async function loginWithValidCred(){
        driver=await setup();
        await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
        var act =await driver.getCurrentUrl();
        assert.equal(act,"https://dev.agent.openbrix.co.uk/");//pass
}
// with url
async function resetPassword(){
        driver=await setup();
        await driver.findElement(By.xpath("//h5[text()='Reset Password']")).click();
        var act = await driver.getCurrentUrl();
        assert.equal(act,"https://dev.agent.openbrix.co.uk/reset-password");//pass
}

async function textLoginWithValidCred(){
        driver=await setup();
        await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
        const act =await driver.getTitle();
        assert.equal(act,"OpenBrix");//pass
}

async function textResetPassword(){
        driver=await setup();
        await driver.findElement(By.xpath("//h5[text()='Reset Password']")).click();
        const act = await driver.getTitle();
        assert.equal(act,"OpenBrix");//pass
}


async function loginWithoutPassword(){
    driver=await setup();
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();

    const act = await driver.findElement(By.id("client-snackbar")).getText();
    assert.equal(act,"SyntaxError: Unexpected token < in JSON at position 0");//pass
}

async function textLoginWithoutPassword(){
        driver=await setup();
        await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
        await driver.findElement(By.id("password")).sendKeys("");
        await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
        const act=await driver.findElement(By.id("password-helper-text")).getText();
        assert.equal(act,"This field is required");//fail unable to locate element: No such Element Error
}

async function textLoginWithoutEmail(){
        driver=await setup();
        await driver.findElement(By.id("email")).sendKeys("");
        await driver.findElement(By.id("password")).sendKeys("123456");
        await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
        const act=await driver.findElement(By.id("email-helper-text")).getText();
        assert.equal(act,"This field is required");//pass
}
async function propertyBtnLogin(){
         driver=await setup();
         await driver.findElement(By.xpath("//button[text()='Property Search']")).click();
         const act = await driver.getCurrentUrl();
         assert.equal(act,"https://openbrix.co.uk/home");
}
async function dontHaveAccount(){
        driver=await setup();
        await driver.findElement(By.xpath("/html/body/div/div/div/div/div[1]/div[2]/form/div[5]/div/a/h5")).click();
        const act= await driver.getCurrentUrl();
        assert.equal(act,"https://dev.agent.openbrix.co.uk/signup");//pass
}
async function run(){
     await loginwithoutCred();
    //await loginWithValidCred();
    // await resetPassword();          //pass
    // await textLoginWithValidCred();
    // await textResetPassword();
    //await loginWithoutPassword();
    //await textLoginWithoutPassword();
    //await textLoginWithoutEmail();
   // await dontHaveAccount();          //pass
   // await propertyBtnLogin();         //FAIL
    }
run()

