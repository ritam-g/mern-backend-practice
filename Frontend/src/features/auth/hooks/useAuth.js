import { useContext } from "react";
import { context } from "../context/AuthContext";
import { getMe, login, register } from "../services/auth.api";



export function UseAuth() {
    const { user, setuser, loading, setloading } = useContext(context)
    async function handelLogin(username, email) {
        try {

            setloading(true)
            const res = await login(username, email)
            setuser(res.user)
        } catch (err) {
            console.log(err);
            return err

        } finally {
            setloading(false)
        }
    }
    async function handelRegister(username, email) {
        try {

            setloading(true)
            const res = await register(username, email)
            setuser(res.user)
        } catch (err) {
            console.log(err);
            return err

        } finally {
            setloading(false)
        }
    }
    async function handleGetMe() {
        try {

            setloading(true)
            const res = await getMe()
            setuser(res.user)
        } catch (err) {
            console.log(err);
            return err

        } finally {
            setloading(false)
        }
    }
    return ({
        handelLogin, handelRegister, handleGetMe, user, loading
    })
}
