<script lang="ts">
export let uri = '';
export let message = '';
export let role = '';
export let permission = '';
</script>

<div class="forbidden">
    <h3>
        You are not authorized to access
        {#if uri}
            <code>{uri}</code>
        {:else}
            <span>this page</span>
        {/if}
    </h3>
    {#if message}
        <p>{message}</p>
    {:else if role}
        <p>Missing role <code>{role}</code></p>
    {:else if permission}
        <p>Missing permission <code>{permission}</code></p>
    {/if}
</div>
