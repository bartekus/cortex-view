use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Deserialize)]
pub struct McpCallRequest {
    pub tool: String,
    pub args: Value,
}

#[derive(Debug, Serialize)]
#[serde(tag = "ok")]
pub enum McpEnvelope {
    #[serde(rename = "true")]
    Ok { result: Value },
    #[serde(rename = "false")]
    Err { error: McpError },
}

#[derive(Debug, Serialize)]
pub struct McpError {
    pub code: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub details: Option<Value>,
}

#[tauri::command(rename_all = "snake_case", name = "cortex_mcp_call")]
pub async fn cmd_cortex_mcp_call(tool: String, args: Value) -> Result<McpEnvelope, String> {
    if tool.trim().is_empty() {
        return Ok(McpEnvelope::Err {
            error: McpError {
                code: "BAD_REQUEST".into(),
                message: "tool is required".into(),
                details: None,
            },
        });
    }

    match dispatch_to_cortex_mcp(&tool, args).await {
        Ok(result) => Ok(McpEnvelope::Ok { result }),
        Err((code, message, details)) => Ok(McpEnvelope::Err {
            error: McpError {
                code,
                message,
                details,
            },
        }),
    }
}

// Keep deps minimal: return a typed error tuple.
async fn dispatch_to_cortex_mcp(
    _tool: &str,
    _args: Value,
) -> Result<Value, (String, String, Option<Value>)> {
    Err((
        "NOT_IMPLEMENTED".into(),
        "dispatch_to_cortex_mcp not implemented".into(),
        None,
    ))
}
