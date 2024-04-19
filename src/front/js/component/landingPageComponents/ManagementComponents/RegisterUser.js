import React, {useState, useContext, useEffect, useRef } from "react";
import { Context } from "../../../store/appContext";
import InputComponent from "../reusableComponents/InputComponent";
<script src="https://cdnjs.cloudflare.com/ajax/libs/air-datepicker/2.2.3/js/i18n/datepicker.en.js"></script>



export const RegisterUser = (props) => {
   
    const { store, actions } = useContext(Context);
    const datepickerRef = useRef(null);

    const [roles, setRoles] = useState([]);

    useEffect(()=> {
        const fetchRoles = async () => {
            const rolesData = await actions.getRoles();
            setRoles(rolesData);
        };
    
        fetchRoles();
    },[]);

    

    return (
        <div>
            <h1 className="mb-5">Edit Profile</h1>
            <div style={{display: "flex"}}>
                <InputComponent label="Name" placeholder="Name"/> 
                <InputComponent label="Sirname" placeholder="Sirname"/> 
            </div>
            <div style={{display: "flex"}}>
                <InputComponent label="Id" placeholder="Id"/> 
                <InputComponent label="Username" placeholder="username"/> 
            </div>
            <div style={{display: "flex"}}>
                <InputComponent label="e-mail" placeholder="e-mail"/>  
            </div>
            <div className="mx-3 my-3" style={{display: "flex", height: "5vh"}}>
                <span className="input-group-text" id="basic-addon1">Role</span>
                 <select 
                     className="form-select form-select-lg mb-3" 
                     aria-label="Large select example" 
                     style={{height: "5vh", width:"30vh",fontSize: '1.5vh'}}
                     > 
                     <option selected>Male</option>
                     <option selected>Female</option>
                     <option selected>Non-Binary</option>
                 </select>
            </div> 
            <div className="row">
                <div className="col-6 mb-3 mx-3" style={{display: "flex", height: '6vh'}}>
                    <span className="input-group-text" id="basic-addon1">Role</span>
                        <select 
                            className="form-select form-select-lg mb-3" 
                            aria-label="Large select example" 
                            style={{height: '6vh', fontSize: '2vh'}}
                            >
                            <option selected>Select a Role</option>
                           { roles != undefined ? 
                                roles.map((role, index)=> (
                                    <option key={index} value={role.id}>{role.role}</option>
                                ))
                                : 
                                <option></option>
                            } 
                        </select>
                </div>
            </div>
            <div className="my-5">
                <button onClick={props.saveUserFunction} type="button" className="btn btn-warning">Save User</button>
            </div>
        </div>
    );
};

export default RegisterUser;
