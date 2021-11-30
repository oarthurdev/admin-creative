const menu = [
{
    title: 'Staff',
    icon: 'settings',
    caption: 'Configure the staff members',
    submenu: [{
        title: 'Register',
        icon: 'add',
        link: '/staff/register',
        caption: 'Add a new staff member'
    },
    {
        title: 'Manage',
        icon: 'settings',
        link: '/staff/manage',
        caption: 'Manage the staff members' 
    }]
}
// {
//     title: 'Product',
//     icon: 'home',
//     caption: 'Manage your products',
//     submenu: {
//         title: 'Register',
//         icon: 'home',
//         link: '/product/register',
//         caption: ''
//     }
// }
]

export default menu