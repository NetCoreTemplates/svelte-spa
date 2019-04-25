<script>
import { createEventDispatcher } from 'svelte';
import { errorResponse, errorResponseExcept } from '../shared'
import classNames from "classnames";

export let name = '';
export let className = '';
export let checked = false;
export let responseStatus = null;

let errorField = name && errorResponse.call({responseStatus},name);
let cls = classNames('form-check', {'is-invalid':errorField,'form-control':errorField});
let clsInput = classNames('form-check-input',{'is-invalid':errorField}, className || '');

const dispatch = createEventDispatcher();
const handleChange = e => {
    dispatch('change', e.target.checked);
}
</script>

<div className={cls}>
    <input type="checkbox" id={name} name={name} bind:checked value="true"
            className={clsInput} onChange={handleChange} />
    
    <label className="form-check-label" for={name}><slot></slot></label>
</div>

{#if errorField}
    <div className="invalid-feedback">{errorField}</div>
{/if}
