import React, { Component } from 'react';
import style from 'sass/profileHeader.sass';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
export default class ProfileHeader extends Component {
  unMounted = true;
  constructor(props) {
    super(props);
    this.state = {
      showBackgroundForm: false,
      showAvatarForm: false,
      showSendMessageModal: false,
      updateImages: false,
      userInfo: props.userInfo,
    }
    RenderUser = RenderUser.bind(this);
  }
  backgroundToggle = () => {
    this.setState({showBackgroundForm: !this.state.showBackgroundForm});
  }
  avatarToggle = () => {
    this.setState({showAvatarForm: !this.state.showAvatarForm});
  }
  onBackgroundChange = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('background', e.target.files[0]);
    this.setState({background: formData});
  }
  onAvatarChange = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    this.setState({avatar: formData});
  }
  handleBackgroundChange = (e) => {
    e.preventDefault();
    fetch('/api/upload', {
      method: 'POST',
      body: this.state.background
    })
    .then(response => response.json())
    .then(response => {
      this.setState((prevState) => {
        let userInfo = prevState.userInfo;
        console.log(userInfo);
        userInfo.user.background = response.background;
        return {updateImages: true, showBackgroundForm: false, userInfo}
      })
    });
  }
  handleAvatarChange = (e) => {
    e.preventDefault();
    fetch('/api/upload', {
      method: 'POST',
      body: this.state.avatar
    })
    .then(response => response.json())
    .then(response => {
      this.setState((prevState) => {
        let userInfo = prevState.userInfo;
        console.log(userInfo);
        userInfo.user.avatar = response.avatar;
        return {updateImages: true, showAvatarForm: false, userInfo}
      })
    });
  }
  sendMessageToogle = (e) => {
    this.setState({showSendMessageModal: !this.state.showSendMessageModal});
  }
  onMessageChange = (e) => {
  }
  handleSendMessage = (e) => {
    fetch('/api/user/messages', {
      method: 'POST',
      body: JSON.stringify({message: e.target.text.value, user: this.state.userInfo.user}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.setState({showSendMessageModal: !this.state.showSendMessageModal});
  }
  sendMessageModal = () => {
    return (
      <div>
        <Modal isOpen={this.state.showSendMessageModal}>
          <ModalHeader>Send message</ModalHeader>
          <form onSubmit={this.handleSendMessage}>
            <ModalBody>
              <Input onSubmit={this.onMessageChange} type="textarea" name="text"/>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.sendMessageToogle}>Close</Button>
              <Button type="submit" color="primary" onClick={this.onMessageChange}>Continue</Button>
            </ModalFooter>
          </form>
        </Modal>
      </div>
    );
  }
  changeBackgroundModal = () => {
    return (
      <div>
        <Modal isOpen={this.state.showBackgroundForm}>
          <ModalHeader>Background change</ModalHeader>
          <ModalBody>
            <input onChange={this.onBackgroundChange} type="file" name="file" accept=".png, .jpg, .jpeg"/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.backgroundToggle}>Close</Button>
            <Button color="primary" onClick={this.handleBackgroundChange}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  changeAvatarModal = () => {
    return (
      <div>
        <Modal isOpen={this.state.showAvatarForm}>
          <ModalHeader>Avatar change</ModalHeader>
          <ModalBody>
            <input onChange={this.onAvatarChange} type="file" name="file" accept=".png, .jpg, .jpeg"/>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.avatarToggle}>Close</Button>
            <Button color="primary" onClick={this.handleAvatarChange}>Continue</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  render() {
    return(
      <React.Fragment>
        {this.sendMessageModal()}
        {this.changeAvatarModal()}
        {this.changeBackgroundModal()}
        { this.state.userInfo &&
          <RenderUser userInfo={this.state.userInfo} backgroundToggle={this.backgroundToggle} avatarToggle={this.avatarToggle}
          onSendMessage={this.onSendMessage} onAddFriend={this.onAddFriend} sendMessageToggle={this.sendMessageToogle} updateImages={this.state.updateImages}/>
        }
        {this.state.updateImages && this.setState({updateImages: false})}
      </React.Fragment>
    )
  }
  onSendMessage = () => {
    
  }
  onAddFriend = (user) => {
    fetch('/api/user/friends', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userId: user._id})
    })
    .then(response => response.json())
    .then(response => console.log(response));
  }
}
class RenderUser extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.userInfo);
    this.state = {
      cache: '',
      backgroundStyles: {
        backgroundImage: `url(src/images/backgrounds/${this.props.userInfo.user.background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      },
    }
  }
  generateCache = () => {
    if (this.props.updateImages) {
      this.setState({
        cache: `?${new Date().getTime()}`,
        backgroundStyles: {
          backgroundImage: `url(src/images/backgrounds/${this.props.userInfo.user.background}?${new Date().getTime()})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        },
      })
    }
  }
  render() {
    this.generateCache();
    return (
      <div className="container-fluid profile" style={this.state.backgroundStyles}>
        <div className="container profile-header">
          <div className="header-info">
            <div className="info-image">
              <img src={`src/images/avatars/${this.props.userInfo.user.avatar}${this.state.cache}`}></img>
            </div>
            <div className="info-text">
              <h1 className="text-username">{this.props.userInfo.user.username}</h1>
              <h2 className="text-level">{this.props.userInfo.user.level}</h2>
              <h2 className="text-exp">{this.props.userInfo.user.exp}</h2>
              <h2 className="text-completed">{this.props.userInfo.user.completed}</h2>
            </div>
          </div>
          { this.props.userInfo.isYou ?
          <div className="header-buttons">
            <button onClick={this.props.backgroundToggle}>Change background</button>
            <button onClick={this.props.avatarToggle}>Change avatar</button>
          </div>
          :
          <div className="header-buttons">
            <button onClick={this.props.sendMessageToggle}>Send Message</button>
            <button onClick={() => this.props.onAddFriend(this.props.userInfo.user)}>Add friend</button>
            </div>
          }
        </div>
      </div>
    );
  }
}