import React from 'react'

export type StringTransformerFunc = (v:string) => string

export interface TextInputProps {
    // field or flatField, field is default
    // flatField leaves no vertical spacing
    cssName?: string
    name: string
    v: string
    setV: React.Dispatch<React.SetStateAction<string>>
    vTransformer?: StringTransformerFunc
}

export const TextInput: React.FC<TextInputProps> = ({cssName = 'field', name, v, setV, vTransformer = null}) => {
    const onInputChange= (ev: React.ChangeEvent<HTMLInputElement>) => {
        let newV = ev.target.value
        if (vTransformer) {
            newV = vTransformer(newV)
        }
        setV(newV)
    }
    return <div className={cssName}>
        <label className='label'>{name}</label>
        <input className='control' type='text' onChange={onInputChange}/>
    </div>
}