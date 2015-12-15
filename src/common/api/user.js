export function getUser(callback) {
  // simulate async 
  setTimeout(() => {
    callback({
      name : 'Buchanan Edwarsa',
      dept : 'Web Dev Team',
      lastLogin : new Date(),
      email : 'be@be.com',
      id : '0910' 
    });
  }, 350);

}