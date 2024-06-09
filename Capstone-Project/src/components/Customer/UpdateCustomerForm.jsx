import { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CustomerContext } from '../../contexts/CustomerContext';
import { getCustomerById, updateCustomerById } from '../../services/CustomerApi';

function UpdateCustomerForm() {

  const {id} = useParams();
  const navigate = useNavigate();
  const {customer , updateCustomer} = useContext(CustomerContext);

  async function update(target){
    target.preventDefault();
    
    try{
      await updateCustomerById(id, customer);
      navigate(`/customer`)
    }catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const customer = await getCustomerById(id);
        updateCustomer(customer)
      }catch (error){
        console.log(error)
      }
    }
    fetchData();
  },[])

  const handleChange = (event) => {
    const {id, value} = event.target;
    
    switch(id) {
      case "name":
        updateCustomer({...customer, name: value === "" ? null : value});
        break;
      case "phone":
        updateCustomer({...customer, phone: value === "" ? null : value});
        break;
      case "mail":
        updateCustomer({...customer, mail: value === "" ? null : value});
        break;
      case "address":
        updateCustomer({...customer, address: value === "" ? null : value});
        break;
      case "city":
        updateCustomer({...customer, city: value === "" ? null : value});
        break;
    }
  }

  return (
    <div>
      <form>

        <div>
          <label htmlFor="name">Name</label>
          <input onChange={handleChange} value={customer.name || ''} type="text"  id = 'name' />
        </div>

        <div>
          <label htmlFor="phone">phone</label>
          <input onChange={handleChange} value={customer.phone || ''} type="text"  id = 'phone' />
        </div>

        <div>
          <label htmlFor="mail">mail</label>
          <input onChange={handleChange} value={customer.mail || ''} type="text"  id = 'mail' />
        </div>

        <div>
          <label htmlFor="address">address</label>
          <input onChange={handleChange} value={customer.address || ''} type="text"  id = 'address' />
        </div>

        <div>
          <label htmlFor="city">city</label>
          <input onChange={handleChange} value={customer.city || ''} type="text"  id = 'city' />
        </div>
      </form>
          <button onClick={update} type='submit'>Update</button>
    </div>
  )
}

export default UpdateCustomerForm