//

// import { createUser, getUsers } from '../../db/queries/users.js';
//

// type User = {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
// };
// //
// export async function load({ params, fetch }) {
//     const users = await getUsers();

//     // if(!response.ok) {
//     //     throw error(404, 'Not found')
//     // }
//     // const users = await response.json();
//     return {
//         users,
//     };
// }
//
// export async function makeAUser() {
//     const data = {
//         email: 'tkd.lsanchez@gmail.com',
//         firstName: 'Levi',
//         lastName: 'Sanchez',
//     };
//     // await createUser(data);
//     console.log(data);
//     return;
// }
//
