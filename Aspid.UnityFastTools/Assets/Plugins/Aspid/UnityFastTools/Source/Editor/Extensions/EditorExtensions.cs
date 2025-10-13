using System.Linq;
using UnityEditor;
using UnityEngine;

// ReSharper disable CheckNamespace
namespace Aspid.UnityFastTools.Editors
{
    public static class EditorExtensions
    {
        public static string GetScriptName(this Object obj)
        {
            if (!obj) return string.Empty;
			
            var targetType = obj.GetType();
            var attributes = targetType.GetCustomAttributes(false);

            return attributes.Any(attribute => attribute is AddComponentMenu) 
                ? ObjectNames.GetInspectorTitle(obj)
                : ObjectNames.NicifyVariableName(targetType.Name);
        }
    }
}