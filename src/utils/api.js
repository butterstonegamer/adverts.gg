import axios from 'axios';

export function getUserDetails() {
    return axios.get('http://localhost:3001/api/auth', {withCredentials: true})
}

export function getServers() {
    return axios.get('http://localhost:3001/api/post/servers', {withCredentials: true})
}

export function postBecomeSeller(email, id) {
    return axios.post('http://localhost:3001/api/post/seller', {
        email,
        discordId: id
    }).catch((error) => {
        console.log(error.response.data)
    })
}

export function getOrders() {
    return axios.get('http://localhost:3001/api/post/orders', {withCredentials: true})
}

export function postAddServer(selectedServerId, selectedServerName, selectedCatagory, pingCost, noPingCost, everyoneEnabled, description, userID, userEmail, icon, invite) {
    let cost
    if(everyoneEnabled) {
        cost = pingCost
    } else {
        cost = noPingCost
    }
    axios.post('http://localhost:3001/api/post/addserver', {
        id: selectedServerId,
        name: selectedServerName,
        catagory: selectedCatagory,
        cost: cost,
        everyone: everyoneEnabled,
        description: description,
        email: userEmail,
        icon: icon,
        invite: invite,
        userId: userID,
    }).then(function (response) {
        console.log('success')
      }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function postEditServer(selectedServerId, selectedServerName, selectedCatagory, pingCost, noPingCost, everyoneEnabled, description, userID, userEmail, icon, invite) {
    let cost
    if(everyoneEnabled) {
        cost = pingCost
    } else {
        cost = noPingCost
    }
    axios.post('http://localhost:3001/api/post/editserver', {
        id: selectedServerId,
        name: selectedServerName,
        catagory: selectedCatagory,
        cost: cost,
        everyone: everyoneEnabled,
        description: description,
        email: userEmail,
        icon: icon,
        invite: invite,
        userId: userID,
    }).then(function (response) {
        console.log('success')
      }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function postBrowseServers(maxPrice, minPrice, maxServerSize, minServerSize, maxOnline, minOnline, catagory, sort, adType, page) {
    return axios.post('http://localhost:3001/api/post/browse', {
        maxPrice,
        minPrice,
        maxServerSize,
        minServerSize,
        maxOnline,
        minOnline,
        catagory,
        sort,
        adType,
        page
    }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function postCheckout(id, message, userId) {
    return axios.post('/post/checkout', {
        id,
        message,
        userId
    }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function rejectOrder(id, reason) {
    return axios.post('/post/reject', {
        id,
        reason
    }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function completeOrder(id) {
    return axios.post('/post/complete', {
        id,
    }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}

export function getUserOrders(page) {
    return axios.post('/post/all-orders', {
        page,
    }).catch((error) => {
        alert(error.response.data.msg)
        console.log(error.response.data)
    })
}