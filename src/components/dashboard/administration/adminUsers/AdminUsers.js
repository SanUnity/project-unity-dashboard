import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ModalDouble, Loading, ModalError, FormAdminUser, FiltersBar } from '../../../index';
import { adminService } from '../../../../services/index';
import DisplayUtils from '../../../../utils/DisplayUtils';
import './AdminUsers.css'

const AdminUsers = () => {

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [userList, setUserList] = useState([]);
    const [deleteUser, setDeleteUser] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [addUser, setAddUser] = useState(null);
    const [idUser, setIdUser] = useState(null);

    useEffect(() => {
        const getAllUsers = async () => {
            setLoading(true);
            try {
                const response = await adminService.getAllUsers();
                const data = response.items.map((user) => {
                    return {
                        key: user.id,
                        email: user.email,
                        id: user.id,
                        name: user.name,
                        role: user.role,
                        roleDescription: user.roleDescription
                    };
                });
                setUserList(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showErrorModal();
            }
        };
        getAllUsers();
    }, []);

    const getColumnSearchProps = (name, dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Buscar ${name}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined/>}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Buscar
            </Button>
            <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) => text,
    });
    
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    
    const handleReset = (clearFilters) => {
        clearFilters();
    };


    const desktopColumns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('nombre', 'name'),
        },
        {
          title: 'Rol',
          dataIndex: 'roleDescription',
          key: 'roleDescription',
          ...getColumnSearchProps('Rol', 'roleDescription'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          ...getColumnSearchProps('email', 'email'),
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (key) => (
            <div className="desktop actions-container row m-0 d-flex justify-content-center">
              <button className="d-flex align-items-center bg-main-covid justify-content-center mr-3" onClick={() => onEditUser(key)}>
                <img alt="edit-icon" src="/misc/icons/edit_white.svg" />
              </button>
              <button className="d-flex align-items-center bg-main-covid justify-content-center" onClick={() => showDeleteModal(key.id)}>
                <img alt="delete-icon" src="/misc/icons/delete.png" />
              </button>
            </div>
          ),
        },
    ];

    const mobileColumns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          ...getColumnSearchProps('nombre', 'name'),
        },
        {
          title: 'Rol',
          dataIndex: 'roleDescription',
          key: 'roleDescription',
          ...getColumnSearchProps('Rol', 'roleDescription'),
        },
        {
          title: 'Acciones',
          key: 'acciones',
          render: (key) => (
            <div className="mobile actions-container row m-0 d-flex justify-content-center">
              <button className="d-flex align-items-center bg-main-covid justify-content-center mr-2" onClick={() => onEditUser(key)}>
                <img alt="edit-icon" src="/misc/icons/edit_white.svg" />
              </button>
              <button className="d-flex align-items-center bg-main-covid justify-content-center" onClick={() => showDeleteModal(key.id)}>
                <img alt="delete-icon" src="/misc/icons/delete.png" />
              </button>
            </div>
          ),
        },
    ];

    const showDeleteModal = async (id) => {
        setIdUser(id);
        await setDeleteUser(true);
        window.$('#doubleModal').modal('show');
    };
    
    const hideDoubleModal = async () => {
        await setDeleteUser(false);
        window.$('#doubleModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
    };

    const onRemoveUser = async () => {
        setLoading(true);
        try {
            const response = await adminService.removeUser(idUser); // eslint-disable-line
            setLoading(false);
            hideDoubleModal();
            const update = userList.filter((user) => user.id !== idUser);
            setUserList(update);
        } catch (error) {
            setLoading(false);
            hideDoubleModal();
            showErrorModal();
        }
    };

    const onEditUser = (user) => {
        setIdUser(null);
        setEditUser(user)
    }

    const showErrorModal = async () => {
        await setShowError(true);
        window.$('#errorModal').modal('show');
    };

    const hideErrorModal = () => {
        setShowError(false);
        window.$('#errorModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
    };

    const reloadData = async () => {
        setEditUser(null);
        setAddUser(null);
        setLoading(true);
        try {
            const response = await adminService.getAllUsers();
            const data = response.items.map((user) => {
                return {
                    email: user.email,
                    id: user.id,
                    name: user.name,
                    role: user.role,
                    roleDescription: user.roleDescription
                };
            });
            setUserList(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            showErrorModal();
        }
    }

    return(
      <div>
        <FiltersBar title="Administración de usuarios" />
        <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? "mobile" : "desktop"} admin-users-container`}>
            {showError && <ModalError hideErrorModal={hideErrorModal} />}
            {deleteUser && (
                <ModalDouble
                    title="¿Seguro que quieres eliminar al usuario seleccionado?"
                    mainBtnText="Si"
                    secondaryBtnText="No"
                    mainAction={onRemoveUser}
                    secondaryAction={hideDoubleModal}
                    closeModal={hideDoubleModal}
                />
            )}
            {loading ? (
                 <div style={DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%', height: '100%' }}>
                    <Loading white={true} />
                </div>
            ) : (
                <div className="h-100">
                    {editUser ? (
                        <FormAdminUser user={editUser} setAddEditUser={setEditUser} reloadData={reloadData}/>
                    ) : addUser ? (
                        <FormAdminUser setAddEditUser={setAddUser} reloadData={reloadData}/>
                    ) : (
                        <div>
                            <Table className="" columns={DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? mobileColumns : desktopColumns} dataSource={userList} />
                            <button 
                                onClick={() => setAddUser(true)}
                                className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} add-user-btn bg-main-covid white btn-transparent d-flex align-items-center justify-content-center`}>
                                <img alt="show-icon" src="/misc/icons/add-white.svg" className="ml-1" />
                                <span>Añadir usuario</span>
                            </button>
                        </div>
                    )}

                </div>
            )}
        </div>
      </div>
    )
};

export default AdminUsers;