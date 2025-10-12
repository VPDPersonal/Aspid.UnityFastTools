using Unity.Profiling;

// ReSharper disable once CheckNamespace
namespace Aspid.UnityFastTools
{
    public static class ProfilerMarkerExtensionsForGenerator
    {
        public static ProfilerMarker.AutoScope Marker(this object _) => default;
        
        public static ProfilerMarker.AutoScope WithName(this in ProfilerMarker.AutoScope marker, string _) => marker;
    }
}