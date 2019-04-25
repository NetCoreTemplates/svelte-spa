<script>
import { errorResponse, errorResponseExcept } from '../shared'

export let except = '';
export let responseStatus = null;

$: errorField = errorResponseExcept.call({responseStatus},except);
</script>


{#if errorField}
    <div class="alert alert-danger mt-2">{errorField}</div>
{/if}
