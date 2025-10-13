using UnityEngine.UIElements;

// ReSharper disable CheckNamespace
namespace Aspid.UnityFastTools.Editors
{
    public static class TextElementExtensions
    {
        public static T SetText<T>(this T textElement, string text)
            where T : TextElement
        {
            textElement.text = text;
            return textElement;
        }
    }
}