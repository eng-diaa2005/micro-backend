import bcrypt from "bcrypt"

export const hash = ({plantext,salt})=>{
    return bcrypt.hashSync(plantext,salt)
}

export const compareSynchash = ({plantext,salt})=>{
    return bcrypt.compareSync(plantext,salt)
}