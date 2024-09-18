
import { render, screen } from '@testing-library/react';

import UserList from '../../src/components/UserList';
import { User } from '../../src/entities';



describe('UserList', () => {
    it('should render no users when the users array is empty', () => {
        //const user:User={isAdmin:false,id:1,name:'dave'}
        render(<UserList users={[]} />)

        expect(screen.getByText(/no users/i)).toBeInTheDocument()
    })
})
describe('UserList', () => {
    it('should render a list of users', () => {
        const users:User[]=[{isAdmin:false,id:1,name:'dave'},{isAdmin:false,id:2,name:'john'}]
        render(<UserList users={users} />)

        users.forEach(user =>{
            const link = screen.getByRole('link',{name: user.name})
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href',`/users/${user.id}`)
        })
       
    })
})

