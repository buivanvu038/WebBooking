
import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash'
class ModalEditUser extends Component {

   constructor(props){
    super(props);
    this.state={
        id:'',
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        address:''
    }

   
   }
  
    componentDidMount() {
        let user = this .props.currentUser;
        if(user && !_.isEmpty(user)){
            this.setState({
            id:user.id,
            email:user.email,
            password:'hardcode',
            firstName:user.firstName,
            lastName:user.lastName,
            address:user.address

            })
        }
        console.log('dismount edit modal',this.props.currentUser)
    }
    toggle = ()=>{
        this.props.toglleFromParent();
}

//toggle là cái bấm ra ngoài bảng đó để đóng đi 
handleOnchangeInput =(event,id)=>{
    //bad code
    //  this.state[id]=event.target.value;
    //  this.setState({
    //     ...this.state
    //  },()=>{
    //     console.log('check bad state ', this.state)
    //  })
    //good code
    let copyState = {...this.state};//... sao chep nguyen cai contructor 
    copyState[id] = event.target.value;
  this.setState({
    ...copyState
  });
  
}
checkValidateInput=()=>{
   let isValid = true;
    let arrInput = ['email','password','firstName','lastName','address']
    for(let i =0; i< arrInput.length; i++){
       if(!this.state[arrInput[i]]){
        isValid = false;
        console.log('missing parameter'+arrInput[i]);
        break;
       }
    }
    return isValid;
}
handleSaveUser=()=>{
        let isValid = this.checkValidateInput();
        if(isValid===true){
            //call api create
            this.props.editUser(this.state);

        }
      
    }
    render() {
        console.log('check child prop',this.props)
        console.log('check child prop modal',this.props.isOpen)
        return (
            <Modal
            className='modal-user-container'
            size='lg'
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}}  > 
            
            <ModalHeader  toggle={()=>{this.toggle()}}>Edit a new user</ModalHeader>
            <ModalBody>
          
                <div className='modal-user-body'>
                <div className='input-container'>
                    <label>Email</label>
                    <input type='email' 
                    onChange={(event)=>{this.handleOnchangeInput(event,'email')}}
                    value={this.state.email} disabled />
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='password' 
                     onChange={(event)=>{this.handleOnchangeInput(event,'password')}}
                     value={this.state.password} disabled /> 
                </div> 
                <div className='input-container'>
                    <label>firstName</label>
                    <input type='text'
                     onChange={(event)=>{this.handleOnchangeInput(event,'firstName')}}
                     value={this.state.firstName} /> 
                </div> 
                <div className='input-container'>
                    <label>lastName</label>
                    <input type='text' 
                    onChange={(event)=>{this.handleOnchangeInput(event,'lastName')}}
                    value={this.state.lastName} /> 
                </div> 
                <div className='input-container max-width-input'>
                    <label>Address</label>
                    <input type='text' 
                     onChange={(event)=>{this.handleOnchangeInput(event,'address')}} 
                     value={this.state.address} />
                </div> 
                </div>       
            </ModalBody>
            <ModalFooter>
              <Button 
              color="primary" 
              className='px-3' 
              onClick={()=>{this.handleSaveUser()}}>
                Save changes
              </Button>{' '}
              <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);




