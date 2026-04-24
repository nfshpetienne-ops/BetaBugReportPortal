using Microsoft.JSInterop;

namespace BetaBugReportPortal.Services;

public class LocalStorageService(IJSRuntime js)
{
    public async Task<string?> GetItemAsync(string key) =>
        await js.InvokeAsync<string?>("localStorageGet", key);

    public async Task SetItemAsync(string key, string value) =>
        await js.InvokeVoidAsync("localStorageSet", key, value);
}
