const User = require('../models/User')
let LIST_IS_EMPTY = undefined

const initUser = async (userData) => {
    const { username } = userData
    const { id } = userData

    console.log(username)

    const existUser = await User.findOne({ userId: id })

    if (existUser) {
        return [`User ${username} is already registered`, true]
    }

    const user = new User({ userId: id })
    try {
        const savedUser = await user.save()
        if (savedUser) {
            console.log(savedUser)
            return [`User '${username}' registered pa 😎👌`, true]
        }
    } catch (error) {
        console.log(err)
        return [`uy, algo c rompió`, true]
    }
}

const getList = async (userData) => {
    const { id } = userData

    const user = await User.findOne({ userId: id })
    if (user) {
        const { list } = user

        if (list.length === 0) {
            LIST_IS_EMPTY = true
            return [`Your List is empty`, LIST_IS_EMPTY]
        }

        LIST_IS_EMPTY = false
        return ['Your List', LIST_IS_EMPTY, list]
    }

    return [`\nUser ${userData.username} not found`, true]
}

const addElement = async (userData, el) => {
    const { id } = userData

    const user = await User.findOne({ userId: id })
    if (user) {
        user.list.push(el)
        await user.save();
        return [`The element '${el}' was added to the list`, true]
    }
    return [`\nUser ${userData.username} not found`, true]
}

const removeElement = async (userData, el) => {
    const { id } = userData

    const user = await User.findOne({ userId: id })
    if (user) {
        const { list } = user
        const count = list.length

        if (isNumeric(el)) {
            // delete element by index
            const index = parseInt(el)
            if (index > -1) {
                user.list.splice(index, 1);
                await user.save()
            }
        }
        else {
            // delete element by name
            user.list = list.filter(e => e !== el)
            await user.save()
        }
        if (count === user.list.length) {
            return [`The element '${el}' doesn't exist in the list`, true];
        }
        return [`The element  '${el}' was removed from the list`, true]
    }
    return [`\nUser ${userData.username} not found`, true]
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = {
    getList,
    addElement,
    removeElement,
    initUser
}