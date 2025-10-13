using UnityEngine.UIElements;

// ReSharper disable CheckNamespace
namespace Aspid.UnityFastTools.Editors
{
    public static class HelpBoxExtensions
    {
        public static T SetFontSize<T>(this T helpBox, int size)
            where T : HelpBox
        {
            helpBox.Q<Label>().SetFontSize(size);
            return helpBox;
        }
    }
}