export function getId(): string {
  return new Date().toISOString() + Math.random().toString().substr(2, 8);
}
export function getUserId(): string {
  const userid = ['0001Ref1', '0002Ref2', '003Ref3', '0004Ref4'];
  let rand = Math.floor(Math.random() * 4);
  return userid[rand];
}
