import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';


describe('UserAccount', () => {
    it('should not render edit button if user isnt admin' , ()=>{
        const user:User={isAdmin:false,id:1,name:'dave'}
        render(<UserAccount user={user}/>)
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    })
})

describe('UserAccount', () => {
    it('should render edit button if user is admin' , ()=>{
        const user:User={isAdmin:true,id:1,name:'dave'}
        render(<UserAccount user={user}/>)
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/Edit/i);
    })
})
describe('UserAccount', () => {
    it('should always render user name' , ()=>{
        const user:User={isAdmin:true,id:1,name:'dave'}
        render(<UserAccount user={user}/>)
        expect(screen.getByText(user.name)).toBeInTheDocument()
    
    })
})
describe('UserAccount', () => {
    it('should always render heading' , ()=>{
        const user:User={isAdmin:true,id:1,name:'dave'}
        render(<UserAccount user={user}/>)
        const heading = screen.getByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/User Profile/i);
    })
})