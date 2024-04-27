import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers,createNewUserService,deleteUserService,editUserService } from '../../services/userService';
import "./UserManage.scss";
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenmodalUser :false,
            isOpenModalEditUser:false,
            userEdit:{},
        }
    }

    async componentDidMount() {
       await this.getAllUsersFromReact();
    }
    getAllUsersFromReact = async()=>{
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            });
        }
    }
    handleAddNewUser=()=>{
        this.setState({
            isOpenmodalUser :true,
        })
      
    }
    toggleUserModal=()=>{
        this.setState({
            isOpenmodalUser :!this.state.isOpenmodalUser,
        })
    }
    toggleUserEditModal =()=>{
        this.setState({
            isOpenModalEditUser :!this.state.isOpenModalEditUser,
        })
    }
        createNewUser = async (data )=>{
            try{
                let response = await createNewUserService(data);
                if(response && response.errCode !==0){
                    alert(response.errMessage)
                }else{
                    await this.getAllUsersFromReact();
                    this.setState({
                        isOpenmodalUser:false
                    })
                }
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
              }catch(e){
                  console.log(e)
              }
              console.log('check data child ', data)
          
        }
    
        handleDeleteUser = async (user) => {
            //console.log('Người dùng muốn xóa:', user);
            try {
                let res = await deleteUserService(user.id);
                if (res && res.errCode === 0) {
                    // Giả sử hàm này được định nghĩa trong class của bạn
                    await this.getAllUsersFromReact();
                } else {
                    // Xử lý lỗi
                    if (res && res.errMessage) {
                        alert(res.errMessage);
                    } else {
                        alert('Đã xảy ra lỗi khi xóa người dùng.');
                    }
                }
            } catch (e) {
                console.error('Lỗi khi xóa người dùng:', e);
                // Xử lý lỗi
                alert('Đã xảy ra lỗi khi xóa người dùng.');
            }
        }
        handleEditUser = (user)=>{
           console.log('check edit user', user)
           this.setState({
            isOpenModalEditUser:true,
            userEdit:user
        })
        }
        doEditUser =async (user)=>{
            try{
                let res = await editUserService(user);
                if(res && res.errCode===0){
                    this.setState({
                        isOpenModalEditUser:false
                    })
                    await this.getAllUsersFromReact()
                }else{
                    alert(res.errCode)
                }
            }catch(e)
            {
                console.log(e)
            }
            let res = await editUserService(user);
            console.log('click save user ',user)
        }
    render() {
       
        console.log('check render', this.state)
        let arrUser = this.state.arrUser;
        return (
            <div className="users-container">
                <ModalUser
                isOpen={this.state.isOpenmodalUser}
                toglleFromParent={this.toggleUserModal}
                createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                <ModalEditUser
                 isOpen={this.state.isOpenModalEditUser}
                 toglleFromParent={this.toggleUserEditModal}
                 currentUser={this.state.userEdit}
                 editUser={this.doEditUser}
                 />
                }
                <div className='title text-center'>Manage users with Vubui</div>
                <div className='mx-1'>
                    <button
                     className='btn btn-primary px-3'
                     onClick={()=>this.handleAddNewUser()} //hoc thuoc bắt onclick
                     ><i className="fas fa-plus-circle"></i> Add new users</button>
                </div>
                <div className='users-table mt-4 mx-2'>
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={()=>this.handleEditUser(item)} ><i class="far fa-edit"></i></button>
                                        <button className='btn-delete' onClick={()=> this.handleDeleteUser(item)}><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
