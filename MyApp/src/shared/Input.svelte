<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { errorResponse, errorResponseExcept } from '@servicestack/client';
import classNames from 'classnames';

export let responseStatus = null;
export let type = 'text';
export let name = '';
export let placeholder = '';
export let value = '';
export let className = '';
export const model = '';

$: errorField = errorResponse.call({responseStatus}, name);
$: cls = classNames('form-control', {'is-invalid':errorField}, className || 'form-control-lg');

const dispatch = createEventDispatcher();
const handleInput = e => {
    value = e.target.value;
    dispatch('input', value);
};
</script>

<div>
    <input type={type} name={name} value={value} class={cls} placeholder={placeholder} 
          on:input={handleInput} />
    {#if errorField}
        <div class="invalid-feedback">{errorField}</div>
    {/if}
</div>
