
import React, { Component } from 'react';
//import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

   constructor(props){
    super(props);
    this.state={
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        address:''
    }

    this.listenToEmiter();
   }
   listenToEmiter(){
    emitter.on('EVENT_CLEAR_MODAL_DATA',() =>{
       this.setState({
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        address:''
       })
    })
   }
    componentDidMount() {
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
    handleAddNewUser=()=>{
        let isValid = this.checkValidateInput();
        if(isValid===true){
            //call api create
           
            this.props.createNewUser(this.state);
            
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
            
            <ModalHeader  toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
            <ModalBody>
          
                <div className='modal-user-body'>
                <div className='input-container'>
                    <label>Email</label>
                    <input type='email' 
                    onChange={(event)=>{this.handleOnchangeInput(event,'email')}}
                    value={this.state.email} />
                </div>
                <div className='input-container'>
                    <label>Password</label>
                    <input type='password' 
                     onChange={(event)=>{this.handleOnchangeInput(event,'password')}}
                     value={this.state.password} /> 
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
              onClick={()=>{this.handleAddNewUser()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);




