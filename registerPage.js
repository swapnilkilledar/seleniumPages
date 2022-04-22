const{ Builder,By,Key,util} =require ("selenium-webdriver");
 var assert =require('assert');
 
async function inIt(){
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://dev.agent.openbrix.co.uk/signup");
    return driver;
}
async  function register(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var toastMessage = await driver.findElement(By.id("client-snackbar"));//wait?

    assert.equal(await toastMessage.getText(),"User already Exists");
}

async function registerWithoutCreden(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("");
    await driver.findElement(By.id("last_name")).sendKeys("");
    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("");
    await driver.findElement(By.id("confirm-password")).sendKeys("");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();


    var actFirst=await driver.findElement(By.id("first_name-helper-text")).getText();
    var actLast=await driver.findElement(By.id("last_name-helper-text")).getText();
    var actEmail=await driver.findElement(By.id("email-helper-text")).getText();
    var actPassword=await driver.findElement(By.id("password-helper-text")).getText();
    var actConfirm=await driver.findElement(By.id("confirm-password-helper-text")).getText();

    assert.equal(actFirst,"This field is required");//pass
    assert.equal(actLast,"This field is required");//pass
    assert.equal(actEmail,"This field is required");//pass
    assert.equal(actPassword,"This field is required");//pass
    assert.equal(actConfirm,"This field is required");// fail


}
async function registerwithoutEmailId(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actEmail=await driver.findElement(By.id("email-helper-text")).getText();
    assert.equal(actEmail,"This field is required");//pass
}
async function registerwithInvalidEmail(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("abc");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actEmail=await driver.findElement(By.id("email-helper-text")).getText();
    assert.equal(actEmail,"Email is not valid");//pass
}

async function registerWithOutFirstName(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actFirst=await driver.findElement(By.id("first_name-helper-text")).getText();
    assert.equal(actFirst,"This field is required");//pass

}

async function registerWithOutLastName(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("");
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actLast=await driver.findElement(By.id("last_name-helper-text")).getText();
    assert.equal(actLast,"This field is required");//pass
}

async function registerWithOutPassword(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("");
    await driver.findElement(By.id("confirm-password")).sendKeys("123456");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actPassword=await driver.findElement(By.id("password-helper-text")).getText();
    var actpasswordTwo =await driver.findElement(By.id("confirm-password-helper-text")).getText();
    assert.equal(actPassword,"This field is required");//pass
    assert.equal(actpasswordTwo,"Both Password not match");//pass
}
async function registerWithOutConfirmPassword(){
    driver=await inIt();
    await driver.findElement(By.id("first_name")).sendKeys("S");
    await driver.findElement(By.id("last_name")).sendKeys("D");
    await driver.findElement(By.id("email")).sendKeys("abc@gmail.com");
    await driver.findElement(By.id("password")).sendKeys("123456");
    await driver.findElement(By.id("confirm-password")).sendKeys("");
    await driver.findElement(By.xpath("//button[text()='Sign In']")).click();
    var actConfirm=await driver.findElement(By.id("confirm-password-helper-text")).getText();
    assert.equal(actConfirm,"Both Password not match");//pass
}
async function alreadyRegister(){
    driver=await inIt();
    await driver.findElement(By.xpath("//h5[text()='Already have an account? Sign in']")).click();
    const act =await driver.getTitle();
    assert.equal(act,"OpenBrix");

}
async function clickOnSignIn(){
    driver=await inIt();
    await driver.findElement(By.xpath("//button[text()=' Sign in']")).click();
    const act =await driver.getTitle();
    assert.equal(act,"OpenBrix");
}

async function propertyBtn(){
    driver=await inIt();
    await driver.findElement(By.xpath("//button[text()='Property Search']")).click();
    const act =await driver.getCurrentUrl();
    assert.equal(act,"https://openbrix.co.uk/home");//pass
}

async function run(){
   
        //await register();  //Apply  wait so that it will get id of toast message
        // await registerWithoutCreden();
      // await registerwithInvalidEmail();
      // await registerWithOutFirstName();
      // await registerWithOutLastName();
       // await registerwithoutEmailId();
      // await  registerWithOutPassword();
       //await registerWithOutConfirmPassword();
      // await alreadyRegister();
     // await clickOnSignIn();
     await propertyBtn();
}    
run()